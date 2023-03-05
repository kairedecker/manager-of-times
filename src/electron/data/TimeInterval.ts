export enum WorkType {
    Work,
    Break
}
/**
 * Klasse für ein Zeitintervall
 * Enthält Anfangszeit, Endzeit, Arbeitstyp und eine Beschreibung
 */
export class TimeInterval {
    private _start: Date;
    private _end: Date;
    private _hasEnd: boolean;
    type: WorkType;
    description?: string;

    constructor(startTime: Date, type: WorkType, endTime?: Date, description?: string) {
        this._start = startTime ?? new Date();
        this.type = type ?? WorkType.Work;
        this._end = endTime ?? new Date(0);
        this._hasEnd = endTime !== undefined;
        this.description = description ?? "";

        if (this._hasEnd && this.duration() < 1) {
            throw new Error("Start Time cannot be after End time");
        }
    }

    //Getter für Startzeit
    get start(): Date { return this._start; }

    //Getter für Endzeit, wirft Fehler, wenn diese noch nicht gesetzt wurde
    get end(): Date {
        if (!this._hasEnd) {
            throw new Error("No End time defined");
        } else {
            return this._end;
        }
    }

    //Setter für Startzeit, wirft Fehler, wenn Startzeit nach Endzeit liegt
    set start(startTime: Date) {
        if (this._hasEnd && this._end.getTime() - startTime.getTime() < 0) {
            throw new Error("Start Time cannot be after End time");
        } else {
            this._start = startTime;
        }
    }

    //Setter für Endzeit, wirft Fehler, wenn Endzeit vor Startzeit liegt
    set end(endTime: Date) {
        if (endTime.getTime() - this._start.getTime() < 0) {
            throw new Error("End Time cannot be before Start time");
        } else {
            this._end = endTime;
        }
    }

    //Gibt das Datum aus (= Startzeit). Wirft Fehler, wenn Enzeit an einem anderen Tag ist.
    getDate(): Date {
        if (this._end && !this.sameDay(this._start, this._end)) {
            throw new Error("Start and End Time are not on the same Day");
        } else {
            return this._start;
        }
    }

    //Überprüft, ob zwei Daten am gleichen Tag liegen
    sameDay(first: Date, second: Date): boolean {
        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate();
    }

    //Berechnet die Dauer zwischen Startzeit und Endzeit
    duration(): number {
        if (!this._hasEnd) {
            throw new Error("No End time defined");
        } else {
            return this._end.valueOf() - this._start.valueOf();
        }
    }

    // Multipliziert die Dauer mit -1 bei Pausen und 1 bei Arbeitszeit, damit später alles addiert werden kann.
    ajdustedDuration(): number {
        let duration = this.duration();
        return this.type === WorkType.Break ? duration * -1 : duration;
    }
}


//Klasse für alle Intervalle eines Tages
export class WorkDay {
    intervals: Array<TimeInterval>;
    constructor(listOfIntervals?: Array<TimeInterval>) {
        this.intervals = listOfIntervals ?? [];
    }

    addTimeInterval(timeInterval: TimeInterval): Array<TimeInterval> {
        this.intervals.push(timeInterval);
        return this.intervals;
    }

    //Summiert alle Durations eines Tages
    totalWorkTime(): number {
        let sum = 0;
        this.intervals.map((interval) => sum += interval.ajdustedDuration());
        return sum;
    }

    printIntervals(): void {
        for (let interval of this.intervals) {
            console.log(`Beschreibung: "${interval.description}" \t Typ: ${interval.type === WorkType.Break ? "Pause" : "Arbeit"} \t Dauer: ${interval.ajdustedDuration() / 3600000}`)
        }
    }
}