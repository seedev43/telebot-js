function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Membandingkan dua elemen berturut-turut
      if (arr[j] > arr[j + 1]) {
        // Menukar elemen jika mereka tidak dalam urutan yang benar
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

module.exports = { bubbleSort };
