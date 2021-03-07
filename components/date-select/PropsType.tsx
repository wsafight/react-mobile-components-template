type datePickerPropsWithoutVisible = Omit<any, 'visible'>;

export default interface BaseDateSelectProps extends datePickerPropsWithoutVisible {
  placeholder?: string;
  format?: string;
  hasArrow?: boolean;
}
