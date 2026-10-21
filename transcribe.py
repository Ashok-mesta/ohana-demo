import whisper, json, sys
m = whisper.load_model("small.en")
r = m.transcribe(sys.argv[1], word_timestamps=True, fp16=False)
out = {"text": r["text"], "segments": [{"start": s["start"], "end": s["end"], "text": s["text"], "words": [{"w": w["word"], "s": w["start"], "e": w["end"]} for w in s.get("words", [])]} for s in r["segments"]]}
json.dump(out, open(sys.argv[2], "w"), indent=1)
print(r["text"])
