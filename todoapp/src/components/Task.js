function Task({text, date, isDone, done, remove, update}) {

    const formatDate = (date) => {
        const day = String(date).split("T")[0].split("-");  
        return day[2] + " / " + day[1] + " / " + day[0];
    }

    const theme = {
        done: {
            backgroundColor: '#5A5A5A',
            color: '#98989C'
        },
        notDone: {
            backgroundColor: '#2196F3'
        }
    }

    const taskTheme = isDone ? theme.done : theme.notDone;

    return (
        <div className="todo" style={{ backgroundColor: taskTheme.backgroundColor, color: taskTheme.color}}>
            <div className="status">
                {isDone ? (
                    <i className="ri-checkbox-line"></i>
                ) : (
                    <i className="ri-checkbox-blank-line" onClick={done}></i>
                )}
            </div>
            <div className = "text">{text}</div>
            <div className = "date">{formatDate(date)}</div>
            <div className= "icons">
                <i className="ri-edit-line" onClick={update}></i>
                <i className="ri-delete-bin-line" onClick={remove}></i>
            </div>
        </div>
    )
}

export default Task;