import os
from dotenv import load_dotenv
load_dotenv()
from services.supabase_client import supabase

videos = [
    {"title": "C Language Tutorial for Beginners (One Shot)", "youtube_url": "https://www.youtube.com/embed/irqbmMNs2Bo?si=xObDYwfXv-qJYAhM"},
    {"title": "1. C Programming in One Shot | Variables, Operators and I/O", "youtube_url": "https://www.youtube.com/embed/rQoqCP7LX60?si=49hF34sVwtOZzDiT"},
    {"title": "2. If Else in 1 Video | C Programming", "youtube_url": "https://www.youtube.com/embed/7PSfRdeY5qE?si=GxEi6mVk7IXlmmyD"},
    {"title": "3. Loops in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/wYvrBXUfFfw?si=m8tcHdp84kFd6P8v"},
    {"title": "4. Pattern Printing in One Video", "youtube_url": "https://www.youtube.com/embed/clIcH1ALHMw?si=yxYJFYjF0jEhyzbo"},
    {"title": "5. Functions & Pointers in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/mIY3QVktHU8?si=NgYvi1RiDfohi5f5"},
    {"title": "6. Recursion in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/Bd-1YM8taBc?si=g7EC67VGQ_9A5TE3"},
    {"title": "7. Arrays in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/aWKJ5lRgI3U?si=g5GwSArCpLT0uL3T"},
    {"title": "8. 2D Arrays in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/sEiMDFdbPGo?si=T_fcSTiWZ2oRX6tF"},
    {"title": "9. Strings in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/8qKp63Ox3vQ?si=DjofijiW21z9urQI"},
    {"title": "10. Structures in One Shot | C Programming", "youtube_url": "https://www.youtube.com/embed/nDmULDo8D18?si=ryjaH37LQdJ3mkQM"},
    {"title": "11. Sorting | Time and Space Analysis", "youtube_url": "https://www.youtube.com/embed/9s1_FWWxvlg?si=F1ERpfIZ9ZJHN7ry"},
    {"title": "12. File Handling | Preprocessor | Dynamic Memory Allocation", "youtube_url": "https://www.youtube.com/embed/4DljBbiC2p4?si=uuxFOn_QuxmDadhF"}
]

client = supabase()

# First delete any existing pps videos to prevent duplicates if ran multiple times
client.table('videos').delete().eq('subject_id', 'pps').execute()

inserted = 0
for v in videos:
    data = {
        "subject_id": "pps",
        "year": "2025-26",
        "semester": "sem1",
        "title": v["title"],
        "video_type": "youtube",
        "youtube_url": v["youtube_url"],
        "duration": ""
    }
    try:
        client.table("videos").insert(data).execute()
        inserted += 1
    except Exception as e:
        print(f"Error inserting {v['title']}: {e}")

print(f"Successfully inserted {inserted} videos for PPS subject!")
