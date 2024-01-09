import React from "react"
import RightArrow from "../../../assets/svg/RightArrow"

const styles = {
    button: `text-[#6188FF] flex items-center cursor-pointer whitespace-nowrap justify-between`
}

const MoreButton = () => {
    return <div className={styles.button}>More <RightArrow /></div>
}

export default MoreButton