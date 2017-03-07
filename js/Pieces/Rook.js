// Rook SubClass
function Rook( color, square ) {
	this.name = 'Rook';
	Piece.call( this, color, square );

	this.getAllowedMoves = function( board ) {
		var squares = [];

		var row = this.square.row;
		var col = this.square.col;

		for ( var i = 1; row + i <= 7; i++ ) {
			var square = board[ row + i ][ col ];
			if ( square.piece == null ) { squares.push( square ); }
			else {
				if ( square.piece.color != this.color ) { squares.push( square ); }
				break;
			}
		}

		for ( var i = 1; row - i >= 0; i++ ) {
			var square = board[ row - i ][ col ];
			if ( square.piece == null ) { squares.push( square ); }
			else {
				if ( square.piece.color != this.color ) { squares.push( square ); }
				break;
			}
		}

		for ( var i = 1; col + i <= 7; i++ ) {
			var square = board[ this.square.row ][ col + i ];
			if ( square.piece == null ) { squares.push( square ); }
			else {
				if ( square.piece.color != this.color ) { squares.push( square ); }
				break;
			}
		}

		for ( var i = 1; col - i >= 0; i++ ) {
			var square = board[ this.square.row ][ col - i ];
			if ( square.piece == null ) { squares.push( square ); }
			else {
				if ( square.piece.color != this.color ) { squares.push( square ); }
				break;
			}
		}

		return squares;
	}
}