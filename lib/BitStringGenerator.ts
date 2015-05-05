// Taken from: https://github.com/glinscott/Garbochess-JS

// Copyright(c) 2011 Gary Linscott
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/ or other materials provided with the distribution.
// 3. The name of the author may not be used to endorse or promote products
// derived from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
// OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
// IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
var N = 624;
var M = 397;
var MAG01 = [0x0, 0x9908b0df];
class BitStringGenerator {
    mt: number[]
    mti: number
    constructor() {
        this.mt = new Array(N);
        this.mti = N + 1;
        this.setSeed(0x1BADF00D);
    }
    setSeed = function (...args: any[]) {
        switch (args.length) {
            case 1:
                if (args[0].constructor === Number) {
                    this.mt[0] = args[0];
                    for (var i = 1; i < N; ++i) {
                        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
                        this.mt[i] = ((1812433253 * ((s & 0xffff0000) >>> 16))
                            << 16)
                        + 1812433253 * (s & 0x0000ffff)
                        + i;
                    }
                    this.mti = N;
                    return;
                }

                this.setSeed(19650218);

                var l = args[0].length;
                var i = 1;
                var j = 0;
                var k: number;

                for (k = N > l ? N : l; k != 0; --k) {
                    var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
                    this.mt[i] = (this.mt[i]
                        ^ (((1664525 * ((s & 0xffff0000) >>> 16)) << 16)
                            + 1664525 * (s & 0x0000ffff)))
                    + args[0][j]
                    + j;
                    if (++i >= N) {
                        this.mt[0] = this.mt[N - 1];
                        i = 1;
                    }
                    if (++j >= l) {
                        j = 0;
                    }
                }

                for (k = N - 1; k != 0; --k) {
                    var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
                    this.mt[i] = (this.mt[i]
                        ^ (((1566083941 * ((s & 0xffff0000) >>> 16)) << 16)
                            + 1566083941 * (s & 0x0000ffff)))
                    - i;
                    if (++i >= N) {
                        this.mt[0] = this.mt[N - 1];
                        i = 1;
                    }
                }

                this.mt[0] = 0x80000000;
                return;
            default:
                var seeds = new Array();
                for (var i = 0; i < args.length; ++i) {
                    seeds.push(args[i]);
                }
                this.setSeed(seeds);
                return;
        }
    }

    next = function (bits: number) {
        if (this.mti >= N) {
            var x = 0;

            for (var k = 0; k < N - M; ++k) {
                x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
                this.mt[k] = this.mt[k + M] ^ (x >>> 1) ^ MAG01[x & 0x1];
            }
            for (var k = N - M; k < N - 1; ++k) {
                x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
                this.mt[k] = this.mt[k + (M - N)] ^ (x >>> 1) ^ MAG01[x & 0x1];
            }
            x = (this.mt[N - 1] & 0x80000000) | (this.mt[0] & 0x7fffffff);
            this.mt[N - 1] = this.mt[M - 1] ^ (x >>> 1) ^ MAG01[x & 0x1];

            this.mti = 0;
        }

        var y = this.mt[this.mti++];
        y ^= y >>> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >>> 18;
        return (y >>> (32 - bits)) & 0xFFFFFFFF;
    }
}

export = BitStringGenerator
