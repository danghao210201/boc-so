import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { getUserInfo } from "zmp-sdk/apis";

// Interface cho dữ liệu từ API customer_search
interface TicketRecord {
    queue_number: string;
    counter_name: string;
    department_name: string;
    service_name: string;
    zaloname: string;
    created_at: string;
    status: "waiting" | "called" | "serving" | "skipped" | "cancelled" | "completed";
}

interface CustomerSearchResponse {
    success: boolean;
    data: {
        records: TicketRecord[];
    };
}

export const CalComing: FC = () => {
    const [ticketData, setTicketData] = useState<TicketRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Hàm lấy dữ liệu từ API customer_search
    const fetchTicketData = async () => {
        try {
            setLoading(true);
            const { userInfo } = await getUserInfo({});
            
            if (!userInfo || !userInfo.id) {
                setError("Không thể lấy thông tin người dùng từ Zalo");
                return;
            }

            const response = await fetch(
                `https://demo8.tayninh.gov.vn/backend/api/stats/customer_search.php?zaloid=${userInfo.id}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data: CustomerSearchResponse = await response.json();
            
            if (data.success && data.data.records.length > 0) {
                // Lọc bỏ các vé số đã hoàn thành
                const activeTickets = data.data.records.filter(record => record.status !== 'completed');
                
                if (activeTickets.length > 0) {
                    // Lấy số mới nhất chưa hoàn thành (record đầu tiên)
                    const latestActiveTicket = activeTickets[0];
                    setTicketData(latestActiveTicket);
                } else {
                    setTicketData(null);
                }
            } else {
                setTicketData(null);
            }
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu vé số:", err);
            setError("Không thể tải dữ liệu vé số");
        } finally {
            setLoading(false);
        }
    };

    // Hàm format thời gian
    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    // Hàm lấy màu sắc theo trạng thái
    const getStatusColor = (status: string) => {
        switch (status) {
            case "waiting":
                return "bg-yellow-500";
            case "called":
                return "bg-blue-500";
            case "serving":
                return "bg-green-500";
            case "completed":
                return "bg-gray-500";
            case "cancelled":
            case "skipped":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    // Hàm lấy text trạng thái tiếng Việt
    const getStatusText = (status: string) => {
        switch (status) {
            case "waiting":
                return "Đang chờ";
            case "called":
                return "Đã gọi";
            case "serving":
                return "Đang phục vụ";
            case "completed":
                return "Hoàn thành";
            case "cancelled":
                return "Đã hủy";
            case "skipped":
                return "Đã bỏ qua";
            default:
                return status;
        }
    };

    useEffect(() => {
        fetchTicketData();
    }, []);

    if (loading) {
        return (
            <Box className="p-4 bg-white rounded-lg shadow-sm mx-4 my-4">
                <Text className="text-center text-gray-500">Đang tải dữ liệu...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="p-4 bg-white rounded-lg shadow-sm mx-4 my-4">
                <Text className="text-center text-red-500">{error}</Text>
            </Box>
        );
    }

    if (!ticketData) {
        return (
            <Box className="p-4 bg-white rounded-lg shadow-sm mx-4 my-4">
                <Text className="text-lg font-semibold text-gray-800 mb-3">
                    Lịch hẹn sắp tới
                </Text>
                <Text className="text-center text-gray-500">Bạn chưa có lịch hẹn nào</Text>
            </Box>
        );
    }

    return (
        <Box className="p-4 bg-white rounded-lg shadow-sm mx-4 my-4">
            {/* Header */}
            <Text className="text-lg font-semibold text-gray-800 mb-3">
                Lịch hẹn sắp tới
            </Text>
            
            {/* Number Card */}
            <Box className={`${getStatusColor(ticketData.status)} rounded-lg p-2 text-center mb-2`}>
                <Text className="text-white text-sm mb-2">Số thứ tự</Text>
                <Text className="text-white text-4xl font-bold">{ticketData.queue_number}</Text>
                <Text className="text-white text-xs mt-1">{getStatusText(ticketData.status)}</Text>
            </Box>
            
            {/* Queue Info */}
            <Box className="text-center mb-4">
                <Text className="text-blue-500 text-xl font-bold mb-1">{ticketData.counter_name}</Text>
                <Text className="text-gray-500 text-sm">{ticketData.service_name}</Text>
            </Box>
            
            {/* Details */}
            <Box className="space-y-3">
                {/* Department */}
                <Box className="flex items-center gap-3">
                    <Icon icon="zi-location" size={20} className="text-gray-600" />
                    <Text className="text-gray-800 text-sm flex-1">
                        Trung tâm hành chính công {ticketData.department_name}
                    </Text>
                </Box>
                
                {/* Person */}
                <Box className="flex items-center gap-3">
                    <Icon icon="zi-user" size={20} className="text-gray-600" />
                    <Text className="text-gray-800 text-sm">{ticketData.zaloname}</Text>
                </Box>
                
                {/* Time */}
                <Box className="flex items-center gap-3">
                    <Icon icon="zi-clock-1" size={20} className="text-gray-600" />
                    <Text className="text-gray-800 text-sm">{formatDateTime(ticketData.created_at)}</Text>
                </Box>
            </Box>
        </Box>
    );
};