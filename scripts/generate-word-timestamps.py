#!/usr/bin/env python3
"""
Generate word-level timestamps from audio narration using OpenAI Whisper.

Usage:
  pip install openai-whisper
  python scripts/generate-word-timestamps.py

This script analyzes each audio file in public/audio/ and outputs word-level
timestamps that can be used to improve narration highlighting sync.

Output is saved to scripts/word-timestamps/ as JSON files.
"""

import whisper
import json
import os
import glob

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "word-timestamps")

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Use "base" model for good accuracy. Use "small" or "medium" for better accuracy.
    print("Loading Whisper model (base)...")
    model = whisper.load_model("base")

    audio_files = sorted(glob.glob(os.path.join(AUDIO_DIR, "*.mp3")))
    print(f"Found {len(audio_files)} audio files\n")

    for audio_path in audio_files:
        filename = os.path.basename(audio_path)
        print(f"Processing: {filename}")

        result = model.transcribe(
            audio_path,
            word_timestamps=True,
            language="en",
        )

        # Extract word-level data
        words = []
        for segment in result["segments"]:
            for word in segment.get("words", []):
                words.append({
                    "word": word["word"].strip(),
                    "start": round(word["start"], 3),
                    "end": round(word["end"], 3),
                })

        # Save output
        out_name = filename.replace(".mp3", ".json")
        out_path = os.path.join(OUTPUT_DIR, out_name)
        with open(out_path, "w") as f:
            json.dump({
                "file": filename,
                "duration": result.get("duration", 0),
                "text": result["text"],
                "words": words,
            }, f, indent=2)

        print(f"  -> {len(words)} words, saved to {out_name}")

        # Also print first 20 words as preview
        for w in words[:20]:
            print(f"     {w['start']:7.3f} - {w['end']:7.3f}  {w['word']}")
        if len(words) > 20:
            print(f"     ... ({len(words) - 20} more words)")
        print()

    print(f"\nDone! Word timestamps saved to {OUTPUT_DIR}/")
    print("Share these JSON files and I can use them to update narrationTimestamps.js")

if __name__ == "__main__":
    main()
