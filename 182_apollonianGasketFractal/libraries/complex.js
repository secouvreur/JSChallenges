
class Complex {
	constructor(a,b){
		this.real = a;
		this.im = b;
	}

	mult(z) {
		return new Complex(
			z.real * this.real - z.im * this.im,
			this.im * z.real + z.im * this.real
		);
	}

	add(z){
		return new Complex(this.real + z.real, this.im + z.im);
	}

	sub(z){
		return new Complex(this.real - z.real, this.im - z.im);
	}

	scale(z){
		return new Complex(z * this.real, z * this.im);
	}

	sqrt(){
		var abs = this.mag(),
			sgn = this.im < 0 ? -1 : 1;
		return new Complex(
			Math.sqrt((abs + this.real) / 2),
			sgn * Math.sqrt((abs - this.real) / 2)
		);
	}

	mag(){
		var a = this.real, b = this.im;
		return Math.sqrt(a * a + b * b);
	}

	equal(z){
		return (Math.round(z.real) == Math.round(this.real)) && (Math.round(z.im) == Math.round(this.im));
	}
}
