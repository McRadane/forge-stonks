import { Autocomplete, Box, TextField } from '@mui/material';
import { FC, HTMLAttributes, Key, SyntheticEvent, useCallback, useMemo, useState } from 'react';

interface ISelectProps {
  label: string;
  onChange: (newValue: string) => void;
  values: { text: string; value: string }[] | string[];
}

export const Select: FC<ISelectProps> = ({ label, onChange, values }) => {
  const normalizedValues = useMemo(() => {
    const normalized: { text: string; value: string }[] = [];

    values.forEach((item) => {
      const text = typeof item === 'object' ? item.text : item;
      const value = typeof item === 'object' ? item.value : item;

      normalized.push({ text: text.toString(), value: value.toString() });
    });

    return [...normalized].sort((a, b) => a.text.localeCompare(b.text));
  }, [values]);

  const [value, setValue] = useState<{
    text: string;
    value: string;
  } | null>(null);

  const handleOnChange = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: { text: string; value: string } | null) => {
      if (value) {
        setValue(value);
        onChange(value.value);
      } else {
        setValue(null);
        onChange('');
      }
    },
    [onChange]
  );

  const handleGetOptionLabel = useCallback((option: { text: string; value: string }) => option.text, []);

  const handleRenderOption = useCallback(
    (
      props: HTMLAttributes<HTMLLIElement> & {
        key: Key;
      },
      option: {
        text: string;
        value: string;
      }
    ) => {
      const { key, ...optionProps } = props;

      return (
        <Box component="li" key={key} sx={{ '& > img': { flexShrink: 0, mr: 2 } }} {...optionProps}>
          {option.text}
        </Box>
      );
    },
    []
  );

  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password' // disable autocomplete and autofill
            }
          }}
          label={label}
        />
      )}
      getOptionLabel={handleGetOptionLabel}
      onChange={handleOnChange}
      options={normalizedValues}
      renderOption={handleRenderOption}
      sx={{ flex: 1 }}
      value={value}
      disablePortal
    />
  );
};
