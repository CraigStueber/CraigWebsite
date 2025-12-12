export type StoryChoice = {
  index: number;
  label: string;
};

export function parseStoryChoices(content: string): StoryChoice[] {
  return content
    .split("\n")
    .map((line): StoryChoice | null => {
      const match = line.match(/^(\d+)\.\s+(.*)$/);
      if (!match || !match[1] || !match[2]) return null;

      return {
        index: Number(match[1]),
        label: match[2].trim(),
      };
    })
    .filter((choice): choice is StoryChoice => choice !== null);
}
