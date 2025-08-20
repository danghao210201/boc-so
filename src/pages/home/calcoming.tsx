import React from "react";
import { FC } from "react";
import { Box, Text, Icon } from "zmp-ui";

export const CalComing: FC = () => {
    return (
        <Box style={{marginTop:"-25%"}} className="p-4 bg-white rounded-lg shadow-sm mx-4 my-4">

            {/* Header */}
            <Text className="text-lg font-semibold text-gray-800 mb-3">
                Lịch hẹn sắp tới
            </Text>
            
            {/* Number Card */}
            <Box className="bg-gray-400 rounded-lg p-2 text-center mb-2">
                <Text className="text-white text-sm mb-2">Số thứ tự</Text>
                <Text className="text-white text-4xl font-bold">4001</Text>
            </Box>
            
            {/* Queue Info */}
            <Box className="text-center mb-4">
                <Text className="text-blue-500 text-xl font-bold mb-1">Quầy 4</Text>
                <Text className="text-gray-500 text-sm">Hồ sơ đất đai</Text>
            </Box>
            
            {/* Details */}
            <Box className="space-y-3">
                {/* Location */}
                <Box className="flex items-center gap-3">
                    <Icon icon="zi-location" size={20} className="text-gray-600" />
                    <Text className="text-gray-800 text-sm flex-1">
                        Trung tâm Phục vụ Hành chính công xã Cần Đước
                    </Text>
                </Box>
                
                {/* Person */}
                <Box className="flex items-center gap-3">
                    <Icon icon="zi-user" size={20} className="text-gray-600" />
                    <Text className="text-gray-800 text-sm">Như Hào</Text>
                </Box>
                
                {/* Time */}
                <Box className="flex items-center gap-3">
                    <Icon icon="zi-clock-1" size={20} className="text-gray-600" />
                    <Text className="text-gray-800 text-sm">13:30-14:30, 20/08/2025</Text>
                </Box>
            </Box>
        </Box>
    );
};