import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";

export const Banner: FC = () => {
    return (
        <Box className="zaui-box-wrap">
            <img
                style={{ width: "100%", height: "100%" }}
                src="https://bcp.cdnchinhphu.vn/334894974524682240/2023/12/29/anh-1-1630-17038537624621198431135.jpg"
            />
        </Box>
    );
};
