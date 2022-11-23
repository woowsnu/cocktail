import styled from "styled-components";

const Pagination = (props) => {
  const total = props.total;
  const limit = 7;
  const page = props.page;
  const setPage = props.setPage;
  const numPages = Math.ceil(total / limit);
  return (
    <Nav>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </Nav>
  );
};

export default Pagination;

const Nav = styled.nav`
  max-width: 960px;

  button {
    font-size: 1.4rem;
    color: #999;
  }

  button[aria-current] {
    font-weight: 800;
    color: #101b45;
  }
`;
