import "react-native";

declare module "react-native" {
  interface ViewStyle {
    WebkitBackdropFilter?: string;
    backdropFilter?: string;
    background?: string;
    boxShadow?: string;
    filter?: string;
    transition?: string;
  }
  interface TextStyle {
    WebkitBackdropFilter?: string;
    backdropFilter?: string;
    background?: string;
    boxShadow?: string;
    filter?: string;
  }
}
