'use client';

type Props = {
    currentPage: number;
    totalPages: number;
    pageChangeAction: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, pageChangeAction }: Props) {
    if (totalPages <= 1) return null;

    const handlePageClick = (page: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            pageChangeAction(page);
        }
    };

    return (
        <div className='pagination-wrapper'>
            <ul className='pagination'>
                <li className={currentPage === 1 ? 'disabled' : ''}>
                    <a href='#' onClick={(e) => handlePageClick(currentPage - 1, e)}>
                        <i className='bi bi-chevron-left'></i>
                    </a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={page === currentPage ? 'active' : ''}>
                        <a href='#' onClick={(e) => handlePageClick(page, e)}>
                            {page}
                        </a>
                    </li>
                ))}
                <li className={currentPage === totalPages ? 'disabled' : ''}>
                    <a href='#' onClick={(e) => handlePageClick(currentPage + 1, e)}>
                        <i className='bi bi-chevron-right'></i>
                    </a>
                </li>
            </ul>
        </div>
    );
}
