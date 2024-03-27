import { PlaywrightTestOptions } from '@playwright/test';

export const PREVIEW_URL = '/preview';

/**
 * Keep in sync with app/src/documents/structureComponents.ts
 */
export enum TComponentId {
    accordion= 'accordion',
    adaptivePanel= 'adaptivePanel',
    advancedTables= 'advancedTables',
    alert= 'alert',
    anchor= 'anchor',
    avatar= 'avatar',
    avatarStack= 'avatarStack',
    badge= 'badge',
    blocker= 'blocker',
    button= 'button',
    checkbox= 'checkbox',
    checkboxGroup= 'checkboxGroup',
    controlGroup= 'controlGroup',
    countIndicator= 'countIndicator',
    datePicker= 'datePicker',
    dropdown= 'dropdown',
    dropdownContainer= 'dropdownContainer',
    dropdownMenu = 'dropdownMenu',
    editableTables= 'editableTables',
    fileUpload= 'fileUpload',
    filtersPanel= 'filtersPanel',
    flexCell= 'flexCell',
    flexItems= 'flexItems',
    flexRow= 'flexRow',
    flexSpacer= 'flexSpacer',
    form= 'form',
    iconButton= 'iconButton',
    iconContainer= 'iconContainer',
    labeledInput= 'labeledInput',
    linkButton= 'linkButton',
    mainMenu= 'mainMenu',
    modals= 'modals',
    multiSwitch= 'multiSwitch',
    notificationCard= 'notificationCard',
    numericInput= 'numericInput',
    paginator= 'paginator',
    panel= 'panel',
    pickerInput= 'pickerInput',
    PickerList= 'PickerList',
    pickerModal= 'pickerModal',
    presetsPanel= 'presetsPanel',
    progressBar= 'progressBar',
    radioGroup= 'radioGroup',
    radioInput= 'radioInput',
    rangeDatePicker= 'rangeDatePicker',
    rating= 'rating',
    richTextEditor= 'richTextEditor',
    richTextView= 'richTextView',
    rteOverview= 'rteOverview',
    rteSerializers= 'rteSerializers',
    scrollSpy= 'scrollSpy',
    searchInput= 'searchInput',
    slider= 'slider',
    sliderRating= 'sliderRating',
    spinner= 'spinner',
    statusIndicator= 'statusIndicator',
    'switch' = 'switch',
    tabButton= 'tabButton',
    tables= 'tables',
    tablesOverview= 'tablesOverview',
    tag= 'tag',
    text= 'text',
    textArea= 'textArea',
    textInput= 'textInput',
    textPlaceholder= 'textPlaceholder',
    timePicker= 'timePicker',
    tooltip= 'tooltip',
    useTableState= 'useTableState',
    verticalTabButton= 'verticalTabButton',
    virtualList= 'virtualList'
}

/**
 * Keep list of previews in sync with corresponding *.doc.tsx files
 */
export type TPreviewIdByComponentId = {
    [TComponentId.badge]: ('Colors' | 'Sizes')[],
};

/**
 *
 * Please choose the "viewport" carefully, because it affects:
 *  1) size of a screenshot
 *  2) how fast screenshots are compared
 *
 * NOTE: Height is not important for visual regression tests,
 * because it will always be resized to the actual content height before making a screenshot.
 */
export const SHARED_DEVICE_CFG: Record<string, Partial<PlaywrightTestOptions>> = {
    DEFAULT: {
        locale: 'en-US',
        timezoneId: 'EET',
        viewport: {
            width: 480,
            height: 80,
        },
    },
};
