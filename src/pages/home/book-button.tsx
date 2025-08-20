import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Box, Text, Avatar, Icon } from "zmp-ui";
import { getUserInfo } from "zmp-sdk/apis";

export const BookButton: FC = () => {
    return (
        <Box 
            style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '16px',
                position:"relative",
                bottom: "18%",
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
        >
            <Icon icon="zi-calendar-solid" size={20} style={{color: 'white'}} />
            <Text style={{fontSize: "15px", fontWeight: "bold", color: 'white'}}>CHỌN QUẦY BỐC SỐ</Text>
        </Box>
    );
};
