// RoundSelect.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const RoundSelect = ({ filteredRounds, selectedRoundId, handleRoundSelect, formatDateTime }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Select Round</h3>
            <div className="grid gap-3">
                {filteredRounds.map((round) => (
                    <button
                        key={round.id}
                        onClick={() => handleRoundSelect(round.id)}
                        className={`w-full text-left p-4 rounded-lg transition-all ${selectedRoundId === round.id
                                ? 'bg-blue-600 border-2 border-blue-400'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-lg font-semibold mb-1">
                                    Round {round.roundNumber}
                                </div>
                                <div className="text-sm text-gray-300 flex items-center">
                                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                                    {formatDateTime(round.startTime)} - {formatDateTime(round.endTime, false, true)}
                                </div>
                            </div>
                            {selectedRoundId === round.id && (
                                <div className="text-blue-200 text-sm font-semibold">
                                    Selected
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoundSelect;