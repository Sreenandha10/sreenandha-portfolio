#!/usr/bin/env python3
"""Build the seamless hero loop + portrait + OG image.

Usage:
  python3 scripts/build-hero-assets.py --src intro.mp4 [--photo photo.jpg] [--crop W:H:X:Y]

Needs: ffmpeg, numpy, Pillow (fontTools + brotli optional, for the OG title font).
Outputs: public/hero/hero.mp4, public/hero/hero.webm, public/portrait-bust.webp, public/og.jpg
"""
import argparse, os, subprocess, tempfile, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public")
XFADE = 0.5      # seconds of cross-fade at the loop seam
LOOP_LEN = 10.0  # seconds of source used
ASPECT = 768 / 960


def run(*a):
    subprocess.run(a, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def probe(src):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0",
                                   "-show_entries", "stream=width,height", "-of", "csv=p=0", src], text=True)
    w, h = map(int, out.strip().split(","))
    return w, h


def detect_crop(src, w, h, tmp):
    """Find the person's bounding box on a few frames; return a centred 768:960 crop."""
    run("ffmpeg", "-y", "-i", src, "-vf", "fps=1,scale=640:-1", os.path.join(tmp, "d%02d.png"))
    xs0, xs1, ys0, ys1 = [], [], [], []
    for f in sorted(os.listdir(tmp)):
        if not f.startswith("d"):
            continue
        g = np.array(Image.open(os.path.join(tmp, f)).convert("L")).astype(float)
        ys, xs = np.where(g < 235)
        xs0.append(xs.min()); xs1.append(xs.max()); ys0.append(ys.min()); ys1.append(ys.max())
    s = w / 640
    cx = (np.median(xs0) + np.median(xs1)) / 2 * s
    top, bot = np.min(ys0) * s, np.max(ys1) * s
    ch = min(h, int((bot - top) * 1.06))
    ch = max(ch, int(h * 0.9))
    cw = int(ch * ASPECT)
    x = int(min(max(cx - cw / 2, 0), w - cw))
    y = int(min(max((top + bot) / 2 - ch / 2, 0), h - ch))
    return cw, ch, x, y


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--photo")
    ap.add_argument("--crop", help="W:H:X:Y crop in source pixels (skips auto-detect)")
    ap.add_argument("--name", default="Sreenandha S")
    ap.add_argument("--role", default="Full Stack Developer")
    a = ap.parse_args()
    os.makedirs(os.path.join(OUT, "hero"), exist_ok=True)
    tmp = tempfile.mkdtemp()
    w, h = probe(a.src)
    cw, ch, cx, cy = map(int, a.crop.split(":")) if a.crop else detect_crop(a.src, w, h, tmp)
    print(f"crop {cw}x{ch} at {cx},{cy}")

    # 1-2) crop, scale, whiten backdrop
    base = (f"crop={cw}:{ch}:{cx}:{cy},scale=768:960:flags=lanczos,"
            f"colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,fps=24,format=yuv420p")
    # 3) video loop: body + (tail xfade head)
    t0, t1, x = XFADE, LOOP_LEN - XFADE, XFADE
    fc = (f"[0:v]{base},split=3[v1][v2][v3];"
          f"[v1]trim=start={t0}:end={t1},setpts=PTS-STARTPTS[a];"
          f"[v2]trim=start={t1}:end={LOOP_LEN},setpts=PTS-STARTPTS[b];"
          f"[v3]trim=start=0:end={x},setpts=PTS-STARTPTS[c];"
          f"[b][c]xfade=transition=fade:duration={x}:offset=0[bc];"
          f"[a][bc]concat=n=2:v=1:a=0,format=yuv420p[v]")
    vid = os.path.join(tmp, "loop_video.mkv")
    run("ffmpeg", "-y", "-i", a.src, "-filter_complex", fc, "-map", "[v]", "-c:v", "ffv1", vid)

    # 3b) audio loop, sample accurate, equal-power cross-fade in numpy
    wav_in, wav_out = os.path.join(tmp, "in.wav"), os.path.join(tmp, "loop.wav")
    run("ffmpeg", "-y", "-i", a.src, "-vn", "-ac", "2", "-ar", "48000", "-t", str(LOOP_LEN), wav_in)
    with wave.open(wav_in) as wf:
        sr, ch_n = wf.getframerate(), wf.getnchannels()
        pcm = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).reshape(-1, ch_n).astype(np.float64)
    n = int(LOOP_LEN * sr)
    pcm = np.pad(pcm, ((0, max(0, n - len(pcm))), (0, 0)))[:n]
    xs, s0, s1 = int(x * sr), int(t0 * sr), int(t1 * sr)
    body = pcm[s0:s1]
    tail, head = pcm[s1:s1 + xs], pcm[:xs]
    r = np.linspace(0, 1, xs)[:, None]
    blend = tail * np.cos(r * np.pi / 2) + head * np.sin(r * np.pi / 2)
    loop = np.concatenate([body, blend]).clip(-32768, 32767).astype(np.int16)
    with wave.open(wav_out, "wb") as wf:
        wf.setnchannels(ch_n); wf.setsampwidth(2); wf.setframerate(sr); wf.writeframes(loop.tobytes())
    dur = len(loop) / sr

    # 4) encode (mp4 first, webm second)
    run("ffmpeg", "-y", "-i", vid, "-i", wav_out, "-t", f"{dur:.4f}", "-c:v", "libx264", "-crf", "24",
        "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart",
        "-shortest", os.path.join(OUT, "hero", "hero.mp4"))
    run("ffmpeg", "-y", "-i", vid, "-i", wav_out, "-t", f"{dur:.4f}", "-c:v", "libvpx-vp9", "-crf", "36",
        "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p", "-c:a", "libopus", "-b:a", "80k",
        "-shortest", os.path.join(OUT, "hero", "hero.webm"))

    # 5) poster / portrait / OG
    still = os.path.join(tmp, "still.png")
    run("ffmpeg", "-y", "-i", vid, "-vf", "select=eq(n\\,60)", "-frames:v", "1", still)
    Image.open(still).convert("RGB").save(os.path.join(OUT, "hero", "poster.jpg"), quality=82)
    if a.photo:
        im = Image.open(a.photo).convert("RGB")
        W, H = im.size
        # head-to-shirt crop (4:5), centred horizontally on the subject
        ch_ = int(H * 0.60); cw_ = int(ch_ * 0.8)
        left = max(0, min(W - cw_, int(W * 0.58 - cw_ / 2)))
        top = int(H * 0.085)
        im.crop((left, top, left + cw_, top + ch_)).resize((480, 600), Image.LANCZOS) \
          .save(os.path.join(OUT, "portrait-bust.webp"), quality=86)
    paper = (244, 242, 238)
    og = Image.new("RGB", (1200, 630), paper)
    fig = Image.open(still).convert("RGB").resize((504, 630), Image.LANCZOS)
    og_arr = np.array(og).astype(float); fa = np.array(fig).astype(float) / 255
    og_arr[:, 696:1200] = og_arr[:, 696:1200] * fa  # multiply: white backdrop disappears
    og = Image.fromarray(og_arr.astype(np.uint8)); d = ImageDraw.Draw(og)
    def font(path, size, fallback="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"):
        try:
            from fontTools.ttLib import TTFont
            f = TTFont(path); f.flavor = None
            p = os.path.join(tmp, os.path.basename(path) + ".ttf"); f.save(p)
            return ImageFont.truetype(p, size)
        except Exception:
            return ImageFont.truetype(fallback, size)
    ser = font(os.path.join(ROOT, "src/fonts/InstrumentSerif-Regular.woff2"), 120)
    mono = font(os.path.join(ROOT, "src/fonts/JetBrainsMono-Variable.woff2"), 26,
                "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf")
    d.text((72, 170), a.name.split()[0], font=ser, fill=(13, 13, 13))
    d.text((72, 300), a.role.upper(), font=mono, fill=(119, 117, 111))
    d.text((72, 520), "PORTFOLIO", font=mono, fill=(169, 166, 160))
    og.save(os.path.join(OUT, "og.jpg"), quality=88)
    print("done; loop length", round(dur, 3), "s")


if __name__ == "__main__":
    main()
