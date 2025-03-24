function Pagination({ pageInfo, setCurrentPage }) {
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <nav
      className="d-flex justify-content-center"
      aria-label="Page navigation example"
    >
      <ul className="pagination">
        <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
          <a
            onClick={() => handlePageChange(pageInfo.current_page - 1)}
            className="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${
              pageInfo.current_page === index + 1 && "active"
            }`}
          >
            <a
              onClick={() => handlePageChange(index + 1)}
              className="page-link"
              href="#"
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
          <a
            onClick={() => handlePageChange(pageInfo.current_page + 1)}
            className="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
