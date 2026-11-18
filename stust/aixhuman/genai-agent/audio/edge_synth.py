#!/usr/bin/env python3
"""One Edge TTS request; both endpoints belong to Microsoft's Edge TTS service.

The edge-services endpoint is the one used by edge-tts 7.2.3. Keep this
compatibility override local instead of changing the installed package.
"""
import asyncio
import sys

import edge_tts
import edge_tts.communicate as communicate
from edge_tts.constants import TRUSTED_CLIENT_TOKEN


def main():
    endpoint, voice, rate, text, destination = sys.argv[1:]
    if endpoint == "edge-services":
        communicate.WSS_URL = (
            "wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1"
            "?Ocp-Apim-Subscription-Key=" + TRUSTED_CLIENT_TOKEN
        )
    elif endpoint != "primary":
        sys.exit("Unknown Edge TTS endpoint")
    try:
        asyncio.run(edge_tts.Communicate(text, voice, rate=rate).save(destination))
    except Exception as error:
        # Do not expose WebSocket URLs or query parameters in build logs.
        status = getattr(error, "status", None)
        detail = f" (HTTP {status})" if status else ""
        print(f"{type(error).__name__}: synthesis failed{detail}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
