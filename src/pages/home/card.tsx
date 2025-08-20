import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Box, Text, Avatar } from "zmp-ui";
import { getUserInfo } from "zmp-sdk/apis";

export const Card: FC = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    
    // Lấy thông tin người dùng từ Zalo API
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { userInfo: info } = await getUserInfo({});
                setUserInfo(info);
            } catch (error) {
                console.error('Error fetching user info:', error);
                // Fallback data nếu không lấy được thông tin
                setUserInfo({
                    name: 'Như Hào',
                    avatar: 'https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=NH'
                });
            }
        };
        
        fetchUserInfo();
    }, []);
    
    // Lấy thông tin ngày hiện tại
    const getCurrentDate = () => {
        const now = new Date();
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayOfWeek = days[now.getDay()];
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        
        return {
            dayOfWeek,
            dateString: `${day}/${month}/${year}`
        };
    };

    const { dayOfWeek, dateString } = getCurrentDate();
    
    // Hiển thị loading nếu chưa có thông tin user
    if (!userInfo) {
        return (
            <Box 
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    margin: '16px',
                    position: 'relative',
                    marginTop: '-40px',
                    zIndex: 10
                }}
            >
                <Text>Đang tải thông tin...</Text>
            </Box>
        );
    }

    return (
        <Box 
            style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                margin: '16px',
                position: 'relative',
                marginTop: '-66px',
                zIndex: 10
            }}
        >
            <Avatar 
                size={48}
                src={userInfo.avatar || 'https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=U'}
            />
            <Box>
                <Text size="normal" bold style={{ color: '#333', marginBottom: '4px' }}>
                    {userInfo.name || 'Người dùng'}
                </Text>
                <Text size="small" style={{ color: '#666' }}>
                    {dayOfWeek}, Ngày {dateString}
                </Text>
            </Box>
        </Box>
    );
};
