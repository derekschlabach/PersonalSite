// Piece SuperClass
function Piece( color, square ) {
	this.color = color;
	this.square = square;
	this.moves = 0;
	this.dom = document.createElement( 'img' );
	this.dom.classList.add( 'piece' );
	this.dom.src = '/img/Pieces/' + color.toUpperCase() + this.name + '.png';

	this.getAllowedMoves = function( board ) {
		throw "Unimplemented Function: getAllowedMoves";
	};

	this.isAllowedMove = function( board, square ) {
		allowed = this.getAllowedMoves( board );
		if ( allowed.indexOf( square ) != -1 ) {
			return true;
		}
	};

	this.move = function( board, square ) {
		if ( this.isAllowedMove( board, square ) ) {
			this.square.piece = null;
			square.updatePiece( this );
			this.moves++;
			return true;
		} else {
			return false;
		}
	};
}