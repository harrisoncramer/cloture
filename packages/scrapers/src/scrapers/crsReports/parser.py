import feedparser
NewsFeed = feedparser.parse("https://www.everycrsreport.com/rss.xml")
entries =NewsFeed.entries

for entry in entries:
    print(entry["title"])
    print(entry["link"])
    print(entry["updated"])
    print(entry["id"])
