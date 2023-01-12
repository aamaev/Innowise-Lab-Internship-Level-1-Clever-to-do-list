import React from 'react';

const TaskCounterInfo = ({taskCounter}) => {
    return (
        <div>
            {(taskCounter === 0) && <div className="font-bold text-2xl">{`empty here..`}</div>}
            {(taskCounter === 1) && <div className="font-bold text-2xl">{`1 task in this day`}</div>}
            {(taskCounter > 1) && <div className="font-bold text-2xl">{`${taskCounter} tasks in this day`}</div>}
        </div>
    );
};

export default TaskCounterInfo;