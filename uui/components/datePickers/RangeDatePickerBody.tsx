import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import {
    arrayToMatrix, cx, IControlled, RangeDatePickerPresets,
} from '@epam/uui-core';
import {
    uuiDaySelection, Day, DayProps,
} from '@epam/uui-components';
import { FlexCell, FlexRow } from '../layout';
import { DatePickerBody } from './DatePickerBody';
import { CalendarPresets } from './CalendarPresets';
import css from './RangeDatePickerBody.module.scss';
import {
    defaultRangeValue, getWithFrom, getWithTo, uuiDatePickerBodyBase, valueFormat,
} from './helpers';
import {
    CommonDatePickerBodyProps,
    DatePickerBodyValue,
    RangeDatePickerInputType, RangeDatePickerValue, RangeDatePickerBodyValue,
} from './types';

dayjs.extend(isoWeek);

export function weekCount(displayedDate: Dayjs) {
    let days: Dayjs[] = [];
    const dayOfLastWeekInPrevMonth = displayedDate.subtract(1, 'month').endOf('month').day();
    days = days.concat(new Array(dayOfLastWeekInPrevMonth).fill(undefined));
    // get days of current month
    days = days.concat(new Array(displayedDate.endOf('month').date()).fill(undefined));
    return arrayToMatrix(days, 7).length;
}

export const uuiRangeDatePickerBody = {
    inRange: 'uui-range-datepicker-in-range',
    firstDayInRangeWrapper: 'uui-range-datepicker-first-day-in-range-wrapper',
    lastDayInRangeWrapper: 'uui-range-datepicker-last-day-in-range-wrapper',
    separator: 'uui-range-datepicker-separator',
};

export type PickerPart = 'from' | 'to' | null;

export const rangeDatePickerPresets: RangeDatePickerPresets = {
    today: {
        name: 'Today',
        getRange: () => ({
            from: dayjs().toString(),
            to: undefined,
            order: 1,
        }),
    },
    thisWeek: {
        name: 'This Week',
        getRange: () => ({
            from: dayjs().startOf('isoWeek').toString(),
            to: dayjs().endOf('isoWeek').toString(),
            order: 2,
        }),
    },
    lastWeek: {
        name: 'Last Week',
        getRange: () => ({
            from: dayjs().startOf('isoWeek').subtract(1, 'week').toString(),
            to: dayjs().endOf('isoWeek').subtract(1, 'week').toString(),
            order: 3,
        }),
    },
    thisMonth: {
        name: 'This Month',
        getRange: () => ({
            from: dayjs().startOf('month').toString(),
            to: dayjs().endOf('month').toString(),
            order: 4,
        }),
    },
    lastMonth: {
        name: 'Last Month',
        getRange: () => ({
            from: dayjs().startOf('month').subtract(1, 'month').toString(),
            to: dayjs().subtract(1, 'month').endOf('month').toString(),
            order: 5,
        }),
    },
    last3Month: {
        name: 'Last 3 Months',
        getRange: () => ({
            from: dayjs().startOf('month').subtract(3, 'month').toString(),
            to: dayjs().subtract(1, 'month').endOf('month').toString(),
            order: 5,
        }),
    },
    thisYear: {
        name: 'This Year',
        getRange: () => ({
            from: dayjs().startOf('year').toString(),
            to: dayjs().endOf('year').toString(),
            order: 7,
        }),
    },
    lastYear: {
        name: 'Last Year',
        getRange: () => ({
            from: dayjs().startOf('year').subtract(1, 'year').toString(),
            to: dayjs().subtract(1, 'year').endOf('year').toString(),
            order: 8,
        }),
    },
};

export interface RangeDatePickerBodyProps<T> extends CommonDatePickerBodyProps, IControlled<RangeDatePickerBodyValue<T>> {
    renderFooter?(): React.ReactNode;
    isHoliday?: (day: Dayjs) => boolean;
}

export function RangeDatePickerBody(props: RangeDatePickerBodyProps<RangeDatePickerValue>): JSX.Element {
    const { value: { selectedDate: _selectedDate } } = props;
    const selectedDate = _selectedDate || defaultRangeValue;
    const [activeMonth, setActiveMonth] = React.useState<RangeDatePickerInputType>(null);

    const getRange = (newValue: string) => {
        if (!props.filter || props.filter(dayjs(newValue))) {
            if (props.value.inFocus === 'from') {
                return getWithFrom(selectedDate, newValue);
            }
            if (props.value.inFocus === 'to') {
                return getWithTo(selectedDate, newValue);
            }
        }
        return defaultRangeValue;
    };

    const onBodyValueChange = (v: DatePickerBodyValue<string>, part: 'from' | 'to') => {
        // selectedDate can be null, other params should always have values
        const newRange = v.selectedDate ? getRange(v.selectedDate) : selectedDate;
        const fromChanged = selectedDate?.from !== newRange.from;
        const toChanged = selectedDate?.to !== newRange.to;

        let newInFocus: 'from' | 'to' = null;
        if (props.value.inFocus === 'from' && fromChanged) {
            newInFocus = 'to';
        } else if (props.value.inFocus === 'to' && toChanged) {
            newInFocus = 'from';
        }

        setActiveMonth(part);
        props.onValueChange({
            ...props.value,
            view: v.view,
            month: part === 'from' ? v.month : v.month.subtract(1, 'month'),
            selectedDate: newRange,
            inFocus: newInFocus ?? props.value.inFocus,
        });
    };

    const renderDay = (renderProps: DayProps): JSX.Element => {
        return (
            <Day
                { ...renderProps }
                cx={ getDayCX(renderProps.value, selectedDate) }
            />
        );
    };

    const from: DatePickerBodyValue<string> = {
        ...props.value,
        view: activeMonth === 'from' ? props.value.view : 'DAY_SELECTION',
        selectedDate: null,
    };

    const to: DatePickerBodyValue<string> = {
        view: activeMonth === 'to' ? props.value.view : 'DAY_SELECTION',
        month: props.value.month.add(1, 'month'),
        selectedDate: null,
    };

    const renderPresets = (presets: RangeDatePickerPresets) => {
        return (
            <React.Fragment>
                <div className={ uuiRangeDatePickerBody.separator } />
                <CalendarPresets
                    onPresetSet={ (presetVal) => {
                        props.onValueChange({
                            ...props.value,
                            view: 'DAY_SELECTION',
                            selectedDate: {
                                from: dayjs(presetVal.from).format(valueFormat),
                                to: dayjs(presetVal.to).format(valueFormat),
                            },
                            month: dayjs(presetVal.from),
                        });
                        // toggleIsOpen(false);
                    } }
                    presets={ presets }
                />
            </React.Fragment>
        );
    };

    return (
        <div className={ cx(css.root, uuiDatePickerBodyBase.container, props.cx) } { ...props.rawProps }>
            <FlexRow
                cx={ [props.value.view === 'DAY_SELECTION' && css.daySelection, css.container] }
                alignItems="top"
            >
                <FlexCell width="auto">
                    <FlexRow>
                        <FlexRow cx={ css.bodesWrapper } alignItems="top">
                            <DatePickerBody
                                cx={ cx(css.fromPicker) }
                                value={ from }
                                onValueChange={ (v) => onBodyValueChange(v, 'from') }
                                filter={ props.filter }
                                isHoliday={ props.isHoliday }
                                renderDay={ props.renderDay || renderDay }
                            />
                            <DatePickerBody
                                cx={ cx(css.toPicker) }
                                value={ to }
                                onValueChange={ (v) => onBodyValueChange(v, 'to') }
                                filter={ props.filter }
                                renderDay={ props.renderDay || renderDay }
                                isHoliday={ props.isHoliday }
                            />
                            {props.value.view !== 'DAY_SELECTION' && (
                                <div
                                    style={ {
                                        left: activeMonth === 'from' ? '50%' : undefined,
                                        right: activeMonth === 'to' ? '50%' : undefined,
                                    } }
                                    className={ css.blocker }
                                />
                            )}
                        </FlexRow>
                        {props.presets && renderPresets(props.presets)}
                    </FlexRow>
                    {props.renderFooter && props.renderFooter()}
                </FlexCell>
            </FlexRow>
        </div>
    );
}

const getDayCX = (day: Dayjs, selectedDate: RangeDatePickerValue): string[] => {
    const dayValue = day.valueOf();
    const fromValue = selectedDate?.from
        ? dayjs(selectedDate.from).valueOf() : null;
    const toValue = selectedDate?.to
        ? dayjs(selectedDate.to).valueOf() : null;

    const inRange = fromValue
        && toValue
        && dayValue >= fromValue
        && dayValue <= toValue
        && fromValue !== toValue;
    const isFirst = dayValue === fromValue;
    const isLast = dayValue === toValue;

    return [cx(
        inRange && uuiRangeDatePickerBody.inRange,
        isFirst && uuiRangeDatePickerBody.firstDayInRangeWrapper,
        !inRange && isFirst && uuiRangeDatePickerBody.lastDayInRangeWrapper,
        isLast && uuiRangeDatePickerBody.lastDayInRangeWrapper,
        !inRange && isLast && uuiRangeDatePickerBody.firstDayInRangeWrapper,
        (dayValue === fromValue || dayValue === toValue) && uuiDaySelection.selectedDay,
    )];
};
