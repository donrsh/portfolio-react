import * as R from "ramda";

type EmojiCacheEntry = {
  emoji: string;
  usedTimes: number;
  pinned?: boolean;
};

const localStorageKey = "applet.fullscreen-emoji.emoji-cache";

export const getEmojiCache = R.pipe(
  () => localStorage.getItem(localStorageKey) ?? "null",
  JSON.parse,
  R.defaultTo<EmojiCacheEntry[]>([]),
  R.sortWith([R.descend<EmojiCacheEntry>(R.prop("usedTimes"))])
);

export const cacheEmojiUse = (emoji: string) => {
  const emojiCache = getEmojiCache();

  const matchedEmojiEntry = emojiCache.find((x) => x.emoji === emoji);

  if (matchedEmojiEntry) {
    matchedEmojiEntry.usedTimes += 1;
  } else {
    emojiCache.push({ emoji, usedTimes: 1 });
  }

  localStorage.setItem(localStorageKey, JSON.stringify(emojiCache));
};
