#!/bin/bash
SRC_DIR="src"
OUT_DIR="out"

rm -rf "$OUT_DIR"/*
mkdir -p "$OUT_DIR"

find "$SRC_DIR" -name "*.java" | xargs javac -d "$OUT_DIR"

echo "Compilation complete. Compiled files are in '$OUT_DIR'."
