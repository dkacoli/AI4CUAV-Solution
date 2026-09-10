import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Alert,
} from "@mui/material";
import AdminLayout from "../layouts/AdminLayout";
import { useFetchOrders } from "../hooks/useDataFetch";
import { formatArrayField } from "../helpers/formatters";

export default function OrdersList() {
    const { orders, loading, error } = useFetchOrders();

    return (
        <AdminLayout>
            <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={1} color="black">
                    Orders
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                        {loading ? (
                            <Typography>Loading…</Typography>
                        ) : orders?.length ? (
                            <TableContainer component={Paper} elevation={0}>
                                <Table sx={{ width:"100%" }} aria-label="orders table">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                            <TableCell sx={{ fontWeight: "bold" }}>Detection Types</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Drone Types</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Enviroment</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Urgency Level</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Data Fusion Method</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Dataset URL</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((d) => (
                                            <TableRow
                                                key={d.id}
                                                hover
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell>{formatArrayField(d.detectionTypes)}</TableCell>
                                                <TableCell>{formatArrayField(d.droneTypes)}</TableCell>
                                                <TableCell>{d.enviroment}</TableCell>
                                                <TableCell>{d.urgencyLevel}</TableCell>
                                                <TableCell>{d.dataFusionMethod}</TableCell>
                                                <TableCell>
                                                    {d.datasetURL ? (
                                                        <a href={d.datasetURL} target="_blank" rel="noopener noreferrer">
                                                            {d.datasetURL}
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography color="text.secondary">No orders yet.</Typography>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </AdminLayout>
    );
}
