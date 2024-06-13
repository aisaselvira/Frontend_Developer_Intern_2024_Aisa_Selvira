import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardImage = ({ imageSrc, date, title, description }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mx-2 my-4">
        <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-48 object-cover" 
            loading="lazy" 
        />
        <div className="p-4">
            <p className="text-gray-500 text-sm">{date}</p>
            <h3 className="text-gray-900 font-bold text-lg line-clamp-3 overflow-hidden overflow-ellipsis">{title}</h3>
            <p className="text-gray-700 text-sm">{description}</p>
        </div>
    </div>
);


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState([]);

    useEffect(() => {
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);
        const newVisiblePages = [];

        for (let i = startPage; i <= endPage; i++) {
            newVisiblePages.push(i);
        }

        setVisiblePages(newVisiblePages);
    }, [currentPage, totalPages]);

    const handleNextRange = () => {
        if (visiblePages[visiblePages.length - 1] < totalPages) {
            const newVisiblePages = visiblePages.map(page => page + 1);
            setVisiblePages(newVisiblePages);
        }
    };

    const handlePrevRange = () => {
        if (visiblePages[0] > 1) {
            const newVisiblePages = visiblePages.map(page => page - 1);
            setVisiblePages(newVisiblePages);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <button
                className="px-3 py-1 rounded-l-lg hover:bg-gray-200"
                onClick={() => {
                    onPageChange(currentPage - 1);
                    handlePrevRange();
                }}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            <button
                className="px-3 py-1 hover:bg-gray-200"
                onClick={handlePrevRange}
                disabled={visiblePages[0] === 1}
            >
                &lsaquo;
            </button>
            {visiblePages.map(page => (
                <button
                    key={page}
                    className={`px-3 py-1 ${page === currentPage ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'} border rounded-xl`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-3 py-1 hover:bg-gray-200"
                onClick={handleNextRange}
                disabled={visiblePages[visiblePages.length - 1] === totalPages}
            >
                &rsaquo;
            </button>
            <button
                className="px-3 py-1 rounded-r-lg hover:bg-gray-200"
                onClick={() => {
                    onPageChange(currentPage + 1);
                    handleNextRange();
                }}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

const ListPost = () => {
    const [cards, setCards] = useState([]);
    const [sortOrder, setSortOrder] = useState('-published_at');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
                    params: {
                        'page[number]': currentPage,
                        'page[size]': itemsPerPage,
                        'append[]': ['small_image', 'medium_image'],
                        sort: sortOrder
                    }
                });
                const data = response.data;
                setCards(data.data);
                setTotalPages(Math.ceil(data.meta.total / itemsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCards();
    }, [sortOrder, itemsPerPage, currentPage]);

    const handleSortChange = (event) => {
        const newSortOrder = event.target.value === 'newest' ? '-published_at' : 'published_at';
        setSortOrder(newSortOrder);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); 
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="left-item">
                    <p>Showing {itemsPerPage * (currentPage - 1) + 1} - {Math.min(itemsPerPage * currentPage, cards.length)} of {cards.length}</p>
                </div>
                <div className="right-item flex">
                    <div className="ml-auto">
                        <label className="mr-2">Show per page:</label>
                        <select
                            className="border rounded-xl p-1 mr-4"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <div>
                        <label className="mr-2">Sort by:</label>
                        <select
                            className="border rounded-xl p-1"
                            value={sortOrder === '-published_at' ? 'newest' : 'oldest'}
                            onChange={handleSortChange}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card, index) => (
                    <CardImage
                        key={index}
                        imageSrc={card.small_image || ''} 
                        date={card.published_at || ''}
                        title={card.title || ''}
                        description={card.description || ''}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ListPost;
