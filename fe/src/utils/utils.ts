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

export const calc_age = (birth: string) => {
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
};

export const convert_to_wareki = (birth: string) => {
  const birth_ymd = birth.split('-');
  const dateBirth = new Date(
    parseInt(birth_ymd[0]),
    parseInt(birth_ymd[1]) - 1,
    parseInt(birth_ymd[2])
  );
  const wareki = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'narrow',
  }).formatToParts(dateBirth);
  return wareki[0].value + '.' + wareki[1].value;
};
