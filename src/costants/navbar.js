import {
  GrHomeRounded,
  GrCart,
  GrMailOption,
  GrCreditCard,
} from "react-icons/gr";

export const navElements = [
  {
    id: 1,
    label: "Home",
    icon: <GrHomeRounded />,
  },
  {
    id: 2,
    label: "Ordini",
    icon: <GrCreditCard />,
  },
  {
    id: 3,
    label: "Carrello",
    icon: <GrCart />,
  },
  {
    id: 4,
    label: "Messaggi",
    icon: <GrMailOption />,
  },
];