// Pawn SubClass
function Pawn( color, square ) {
	this.name = 'Pawn';
	Piece.call( this, color, square );
	
	this.dir = ( square.row <= 3 ) ? 1 : -1;

	this.getAllowedMoves = function( board ) {
		var squares = [];
		
		var square1 = board[ this.square.row + this.dir ][ this.square.col ];
		if ( square1.piece == null ) {
			squares.push( square1 );

			if ( this.moves == 0 ) {
				var square2 = board[ this.square.row + ( 2 * this.dir ) ][ this.square.col ];
				if ( square2.piece == null ){
					squares.push( square2 );
				}
			}

		}

		if ( this.square.col > 0 ) {
			var square1a = board[ this.square.row + this.dir ][ this.square.col - 1 ];
			var square0a = board[ this.square.row ][ this.square.col - 1 ];
			
			if ( square1a.piece != null && square1a.piece.color != this.color ) {
				squares.push( square1a );
			}
			/*if ( square1a.piece == null && square0a.piece != null && square0a.piece.color != this.color ) {
				squares.push( square1a );
			}*/						// En Passant
		}

		if ( this.square.col < 7 ) {
			var square1b = board[ this.square.row + this.dir ][ this.square.col + 1 ];
			var square0b = board[ this.square.row ][ this.square.col + 1 ];
			
			if ( square1b.piece != null && square1b.piece.color != this.color ) {
				squares.push( square1b );
			}
			/*if ( square1b.piece == null && square0b.piece != null && square0b.piece.color != this.color ) {
				squares.push( square1b );
			}*/ 					// En Passant
		}

		return squares;
	}

	this.superMove = this.move;
	this.move = function( board, square ) {
		var oldSquare = this.square;
		var enPassant = ( square.piece == null && square.col != this.square.col );

		var success = this.superMove( board, square );
		if ( success ) {

			if ( square.row - ( 3.5 * this.dir ) ==  3.5 ) {
				console.log( "Change Pawn" );
			}
			/*if ( enPassant ) {
				board[ square.row - this.dir ][ square.col ].removePiece();
			}*/		// En Passant
		}

		return success;
	}
}