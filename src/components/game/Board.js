import React from "react";
import { Box, Image } from "@chakra-ui/react";

import EggBoard from "../../images/egg_board.webp";
import EggSelected from "../../images/egg_selected.webp";
import FlakeBoard from "../../images/flake_board.webp";
import FlakeSelected from "../../images/flake_selected.webp";
import GreenOnionBoard from "../../images/green_onion_board.webp";
import GreenOnionSelected from "../../images/green_onion_selected.webp";
import WaterBoard from "../../images/water_board.webp";
import WaterSelected from "../../images/water_selected.webp";
import NoodleBoard from "../../images/noodle_board.webp";
import NoodleSelected from "../../images/noodle_selected.webp";
import SoupBoard from "../../images/soup_board.webp";
import SoupSelected from "../../images/soup_selected.webp";

export default function Board({ ingredient, is_selected, is_display, onClick }) {
    let ingredientJson = {
        "egg": [EggBoard, EggSelected],
        "flake": [FlakeBoard, FlakeSelected],
        "green_onion": [GreenOnionBoard, GreenOnionSelected],
        "water": [WaterBoard, WaterSelected],
        "noodle": [NoodleBoard, NoodleSelected],
        "soup": [SoupBoard, SoupSelected]
    };

    return (
        <Box opacity={is_display ? "1" : "0"} onClick={is_display ? onClick : null}>
            <Image src={ingredientJson[ingredient][is_selected ? 1 : 0]} />
        </Box>
    );
}