export type Order = 'asc' | 'desc';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const double_digit = (arg: number) => {
  return arg < 10 ? '0' + arg.toString() : arg.toString();
};

export const date_to_string = (date: Date | null) => {
  if (date === null) return '';
  const yyyy = date.getFullYear().toString();
  const MM = double_digit(date.getMonth() + 1);
  const dd = double_digit(date.getDate());
  return yyyy + '-' + MM + '-' + dd;
};

export const time_to_string = (date: Date | null) => {
  if (date === null) return '';
  const hh = double_digit(date.getHours());
  const mm = double_digit(date.getMinutes());
  const ss = double_digit(date.getSeconds());
  return hh + ':' + mm + ':' + ss;
};

export const calc_age = (birth: string) => {
  if (birth !== undefined) {
    const birth_ymd = birth.split('-');
    const dateNow = new Date();
    const dateBirth = new Date(
      parseInt(birth_ymd[0]),
      parseInt(birth_ymd[1]) - 1,
      parseInt(birth_ymd[2])
    );
    const dayTillNow =
      (dateNow.getTime() - dateBirth.getTime()) / (1000 * 3600 * 24);
    const DAYS_PER_MONTH = 365 / 12;
    const ageY = Math.floor(dayTillNow / 365);
    const ageM = Math.floor((dayTillNow - 365 * ageY) / DAYS_PER_MONTH);
    return ageY.toString() + '歳' + ageM.toString() + 'ヵ月';
  }
  return 'エラー';
};

export const convert_jp_date = (birth: string, wa = false, age = false) => {
  if (birth !== undefined) {
    const birth_ymd = birth.split('-');
    return (
      birth_ymd[0] +
      (wa ? '(' + convert_to_wareki(birth, 'short') + ')' : '') +
      '年' +
      birth_ymd[1] +
      '月' +
      birth_ymd[2] +
      '日' +
      (age ? ' ' + calc_age(birth) : '')
    );
  }
  return 'エラー';
};

export const convert_sex = (sex_code: string) => {
  if (sex_code !== undefined) {
    return sex_code === '1' ? '男' : '女';
  }
  return 'エラー';
};

export const convert_to_wareki = (birth: string, era = 'narrow') => {
  if (birth !== undefined) {
    const birth_ymd = birth.split('-');
    const dateBirth = new Date(
      parseInt(birth_ymd[0]),
      parseInt(birth_ymd[1]) - 1,
      parseInt(birth_ymd[2])
    );
    const wareki = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      era: era,
    });
    switch (era) {
      case 'narrow': {
        const wa_data = wareki.formatToParts(dateBirth);
        return wa_data[0].value + '.' + wa_data[1].value;
      }
      case 'short': {
        const wa_data = wareki.formatToParts(dateBirth);
        return wa_data[0].value + wa_data[1].value;
      }
      default:
        return 'エラー';
    }
  }
  return 'エラー';
};
