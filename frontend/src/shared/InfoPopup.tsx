import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const InfoPopup = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50vw",
    maxHeight: "60vh",
    // width: "50vw",
    // height: "60%",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "inherit",
    borderRadius: 5,
    overflowY: "auto",
});
