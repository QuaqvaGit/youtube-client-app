export type ButtonParameters = {
  defaultColors: ButtonColorParameters;
  hoverColors: Partial<ButtonColorParameters>;
  expandOnHover?: boolean;
};

export type ButtonColorParameters = {
  backgroundColor: string;
  fontColor: string;
  borderColor?: string;
};
