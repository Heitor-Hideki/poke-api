import React from "react";

const Pagination = (props:any) => {
    const {page, totalPages, onLeftClick, onRightClick} = props
    return (
        <div className="paginationContainer">
            <button onClick={onLeftClick}><div>◀</div></button>
            <div className="paginationText">{page} de {totalPages}</div>
            <button onClick={onRightClick}><div>▶</div></button>
        </div>
    )
}

export default Pagination