type ParsedCounter =
    | {
          hasNumber: true;
          value: number;
          rawNumber: string;
          prefix: string;
          suffix: string;
      }
    | {
          hasNumber: false;
          raw: string;
      };

export function parseCounter(input: string): ParsedCounter {
    const trimmed = input.trim();
    const match = trimmed.match(/^([^0-9\-+]*)([-+]?\d*\.?\d+)(.*)$/);

    if (!match) {
        return {
            hasNumber: false,
            raw: input,
        };
    }
    const [, prefix, rawNumber, suffix] = match;
    const value = Number(rawNumber);

    if (Number.isNaN(value)) {
        return {
            hasNumber: false,
            raw: input,
        };
    }

    return {
        hasNumber: true,
        value,
        rawNumber,
        prefix: prefix.trim(),
        suffix: suffix.trim(),
    };
}
