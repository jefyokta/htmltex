type Content = string | Node;

type Cite = {
  id: string;
  type: string;
  data: Record<string, string>;
};

type ImageOptions = {
  src: string;
  width?: string | undefined;
  caption: string;
  centered: boolean;
  cite?: string | undefined;
};
