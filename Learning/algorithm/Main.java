package com.company;

import java.util.Arrays;

public class Main {

    //Brute force prime number    time-complexity- O(n)
    public boolean bfisPrime( int n){
        for ( int i=2; i<n; i++){
            if ( n % i ==0)
                return false;
        }
        return true;
    }

    //Brute force prime number better version   time-complexity- O(n)

    public boolean betterisPrime( int n){
        for ( int i=2; i<n/2; i++){
            if ( n%i ==0)
                return false;
        }
        return true;
    }

    //Brute force prime number best version    time-complexity- O(sqrt(n))

    public boolean bestisPrime ( int n){
        for ( int i=2; i*i<n; i++){
            if ( n%i ==0)
                return false;
        }
        return true;
    }

    //Eratosthenes' sieve original version
    public void eratosthenesfirst ( int n){
        boolean [] primes = new boolean[n+1];
        for ( int i=2; i<=n; i++){
            primes[i] = true;
        }
        for ( int i=2; i*i<=n; i++){
            if ( primes[i]){
                for ( int j = i; j<=n; j+=i){
                    primes[i] = false;
                }
            }
        }
    }

    //better eratosthenes time-complexity- O(nlog(logn))

    public void betterErato ( int n){
        boolean[] primes = new boolean[n+1];
        for ( int i = 3; i<=n; i+=2){
            primes[i] = true;
        }
        for ( int i =3; i*i<=n; i++){
            if (primes[i]){
                for ( int j =i*i; j<=n; j+=2*i){
                    primes[j] = false;
                }
            }
        }
    }


    //Brute force gcd
    public void Swap( int a, int b){
            a = a + b;
            b = a - b;
            a = a - b;
    }

    public int bruteGcd ( int a, int b){
        if(a<b) {
            Swap(a,b);
        }

        for ( int i=b; i>=2; i-- ){
            if ( a%i==0 && b%i==0)
                return i;
        }
        return 1;
    }

    public int euclid( int a , int b){
        if ( a < b){
            Swap(a,b);
        }
        if( b==0)
            return a;
        else
            return euclid(b, a%b);
    }

    //while version euclid  O(logn)

    public int whileEuclid ( int a, int b){
        if( a < b){
            Swap(a,b);
        }
        while ( b!=0 ){
            int temp = a%b;
            a = b;
            b = temp;
        }
        return a;
    }

    // lowest common multiple  O(logn)

    public int lcm ( int a , int b){
        return a*b / whileEuclid(a,b);
    }

    //求幂  O(logn)
    public int power( int x, int n){
        int result = 1;
        while ( n>0 ){
            if( n%2 ==1)
                result*=x;
            x*=x;
            n/=2;
        }
        return result;
    }

    // PowerMod : (a*b)mod p = ((a mod p)*(b mod p)) mod p
    // x^n mod p =

    public int powerMod ( int x, int n, int p){
        int result = 1;
        while( n>0){
            if(n%2==1)
                result = (result*x) % p;
            x = (x * x)%p;
            n/=2;
        }
        return result;

    }

    // bubble sort
    public void bubble ( int[] array){
        for(int i = array.length-1; i>0; i--){
            boolean sorted = true;
            for(int j = 0; j<i; j++){
                if (array[j]>array[j+1]) {
                    sorted = false;
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
            if ( sorted )
                return;
        }

    }


    public void betterBubble ( int[] array){
        int index=0;
        int mark = array.length-1;
        for ( int i = array.length-1; i>0; i--){
            boolean sorted = true;
             for ( int j=0; j<mark; j++){
                 if( array[j]>array[j+1]) {
                     int temp = array[j];
                     array[j] = array[j + 1];
                     array[j + 1] = temp;
                     sorted = false;
                     index = j;
                 }
             }
            if(sorted) return;
            mark = index;
            System.out.println(Arrays.toString(array));
        }
    }
    //Selection sort

    public void select( int[] array){
        for(int i = 0; i<array.length-1; i++){
            int min = i;
            for (int j = i+1; j<array.length; j++){
                if (array[j] < array[min]){
                    min = j;
                }
            }
            int temp = array[min];
            array[min] = array[i];
            array[i] = temp;

            System.out.println(Arrays.toString(array));

        }
    }



    public void insertSort(int[] x) {


        // 第1个数肯定是有序的，从第2个数开始遍历，依次插入有序序列
        for (int i = 1; i < x.length; i++) {
            int j = 0;
            int temp = x[i]; // 取出第i个数，和前i-1个数比较后，插入合适位置

            // 因为前i-1个数都是从小到大的有序序列，所以只要当前比较的数(list[j])比temp大，就把这个数后移一位
            for (j = i - 1; j >= 0 && temp < x[j]; j--) {
                x[j + 1] = x[j];
            }
            x[j + 1] = temp;
            System.out.println(Arrays.toString(x));
        }
    }

    public void quicksort(int[] x, int left, int right) {
        if (x == null || x.length == 0) {
            return;
        }
//        if (right -left <2) {
//            return;
//        }

        if( left>= right){
            return;
        }

        int pivot = x[left + (right - left) / 2];

        int i  = left, j = right;
        System.out.println(pivot);
        System.out.println(left);
        System.out.println(right);

        while (i <= j) {
            while (x[i] < pivot && i <= j ) {
                i++;
            }
            while (x[j] > pivot && i <= j) {
                j--;
            }
            if (i <= j) {
                int temp = x[i];
                x[i] = x[j];
                x[j] = temp;
                i++;
                j--;
            }
            System.out.println(Arrays.toString(x));
        }
            quicksort(x, left, j );  // logn
            quicksort(x, i, right );
    }
//    public  void quickSort(int[] arr, int low, int high) {
//        if (arr == null || arr.length == 0)
//            return;
//
//        if (low >= high)
//            return;
//
//        // pick the pivot
//        int middle = low + (high - low) / 2;
//        int pivot = arr[middle];
//
//        // make left < pivot and right > pivot
//        int i = low, j = high;
//        while (i <= j) {
//            while (arr[i] < pivot) {
//                i++;
//            }
//
//            while (arr[j] > pivot) {
//                j--;
//            }
//
//            if (i <= j) {
//                int temp = arr[i];
//                arr[i] = arr[j];
//                arr[j] = temp;
//                i++;
//                j--;
//            }
//            System.out.println(Arrays.toString(arr));
//        }
//
//        // recursively sort two sub parts
//        if (low < j)
//            quickSort(arr, low, j);
//
//        if (high > i)
//            quickSort(arr, i, high);
//    }


    public int fibo ( int n){
        int a = 0;
        int b = 1;
        for ( int i = 0; i< n-1; i++){
            int c = a+b;
            a = b;
            b = c;
        }
        return a;
    }

    public int factorial( int n ){
        int result = 1;
        for ( int i = 1; i<=n; i++){
            result*=i;
        }
        return  result;
    }

    public int factorial2 ( int n ){
        while ( n > 1){
            return n * factorial2(n-1);
        }
        return 1;
    }
    public static void main(String[] args) {
	// write your code here
        int[] array = {4,3,8,2,6};
        Main test = new Main();
//        test.betterBubble(array);
////        System.out.println(test.bfisPrime(16));
////        System.out.println(test.power(7,9));
////        test.insertSort(array);
//        System.out.println(test.fibo(7));
//        System.out.println(test.factorial(0));
//        int a = 0;
//        a = test.factorial2(3);
//        System.out.println(a);
        test.quicksort(array,0,array.length-1);
        System.out.println(Arrays.toString(array));
        int a = 1/2;
        System.out.println(a);

    }
}
