import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Chip,
    Button,
    Spinner,
    Input,
} from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { BsTicketPerforatedFill } from "react-icons/bs";


const MyTickets = () => {
    const { user, isAuthenticated } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({ column: "ticketBuyDate", direction: "descending" });
    const [searchQuery, setSearchQuery] = useState('');
    const [buyDate, setBuyDate] = useState(null);

    const userId = user ? user.id : null;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTickets = async () => {
            if (!isAuthenticated || !userId || !token) {
                setError('You need to be logged in to view your tickets.');
                setLoading(false);
                return;
            }
    
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tickets/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error('Error fetching tickets:', error); // Log the error for debugging
                setError('Failed to fetch tickets. Please try again later.'); // User-friendly error
            }
            finally {
                setLoading(false);
            }
        };
    
        fetchTickets();
    }, [userId, token, isAuthenticated]);
    
    const filteredTickets = useMemo(() => {
        let filtered = tickets;

        // Search filtering
        if (searchQuery) {
            filtered = filtered.filter(ticket =>
                (ticket.concert.name && ticket.concert.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (ticket.id && ticket.id.toString().includes(searchQuery)) ||
                (ticket.ticketStatus && ticket.ticketStatus.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Date filtering
        if (buyDate) {
            filtered = filtered.filter(ticket => {
                const ticketDate = new Date(ticket.ticketBuyDate).toDateString();
                return ticketDate === new Date(buyDate).toDateString();
            });
        }

        return filtered;
    }, [tickets, searchQuery, buyDate]);

    const sortedItems = useMemo(() => {
        return [...filteredTickets].sort((a, b) => {
            if (sortDescriptor.column === "ticketBuyDate") {
                const first = new Date(a[sortDescriptor.column]);
                const second = new Date(b[sortDescriptor.column]);
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }

            const cmp = (() => {
                if (sortDescriptor.column === "ticketPrice") {
                    return a.ticketPrice - b.ticketPrice;
                }
                if (sortDescriptor.column === "id") {
                    return Number(a.id) - Number(b.id);
                }
                if (sortDescriptor.column === "concert.name") {
                    const comparison = (a.concert.name || "").localeCompare(b.concert.name || "");
                    return sortDescriptor.direction === "ascending" ? comparison : -comparison;
                }
                return (a[sortDescriptor.column] || "").localeCompare(b[sortDescriptor.column] || "");
            })();

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [filteredTickets, sortDescriptor]);

    const pages = Math.ceil(sortedItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems, rowsPerPage]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSortChange = useCallback((descriptor) => {
        setSortDescriptor(descriptor);
    }, []);

    const getChipColor = (status) => {
        switch (status) {
            case 'UNUSED':
                return 'success';
            case 'USED':
                return 'warning';
            case 'EXPIRED':
                return 'danger';
            default:
                return 'default';
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>My Tickets</h1>

            <div style={{ marginBottom: '3rem', display: 'flex', gap: '2rem'}}>
                <Input
                    clearable
                    underlined
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <DatePicker
                    label="Buy Date"
                    value={buyDate}
                    onChange={(date) => setBuyDate(date)}
                />
            </div>

            {loading && <Spinner label="Loading tickets..." />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && filteredTickets.length === 0 && (
                <p>No tickets found.</p>
            )}
            {!loading && filteredTickets.length > 0 && (
                <>
                    <Table
                        aria-label="My Tickets Table"
                        isHeaderSticky
                        bottomContentPlacement="outside"
                        selectionMode="none"
                        sortDescriptor={sortDescriptor}
                        onSortChange={onSortChange}
                    >
                        <TableHeader>
                            <TableColumn key="concert.name" allowsSorting>Concert Name</TableColumn>
                            <TableColumn key="id" allowsSorting>Ticket ID</TableColumn>
                            <TableColumn key="ticketStatus" allowsSorting>Status</TableColumn>
                            <TableColumn key="ticketPrice" allowsSorting>Price</TableColumn>
                            <TableColumn key="ticketBuyDate" allowsSorting>Buy Date</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody items={items}>
                            {(ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.concert.name}</TableCell>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>
                                        <Chip
                                            color={getChipColor(ticket.ticketStatus)}
                                            variant="flat"
                                        >
                                            {ticket.ticketStatus}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>${ticket.ticketPrice.toFixed(2)}</TableCell>
                                    <TableCell>{new Date(ticket.ticketBuyDate).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Link to={`/my-tickets/detail/${ticket.id}`}>
                                            <Button
                                                size="md" // Increase the size for easier clicking
                                                color="secondary" // Use a primary color to make it stand out
                                                variant="light" // Flat variant for a cleaner, modern look
                                                isHoverable // Add hover effect to give a better interaction feel
                                                auto // Let the button adjust its width automatically for a more compact look
                                            >
                                                <BsTicketPerforatedFill className='text-red-500' /> View Details
                                            </Button>
                                        </Link>
                                    </TableCell>

                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-small">Total Tickets: {filteredTickets.length}</span>
                        <label className="flex items-center text-small">
                            Rows per page:
                            <select
                                className=" bg-black outline-none ml-2"
                                onChange={onRowsPerPageChange}
                                value={rowsPerPage}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </label>
                    </div>

                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={setPage}
                        className="mt-4"
                    />

                    <div className="flex justify-end mt-4 gap-2">
                        <Button isDisabled={page <= 1} onPress={onPreviousPage}>Previous</Button>
                        <Button isDisabled={page >= pages} onPress={onNextPage}>Next</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyTickets;
