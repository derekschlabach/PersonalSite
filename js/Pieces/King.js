// King SubClass
function King( color, square ) {
	this.name = 'King';
	Piece.call( this, color, square );

	this.getAllowedMoves = function( board ) {
		var squares = []

		for ( var i = -1; i <= 1; i++ ) {
			for ( var j = -1; j <= 1; j++ ) {
				var row = this.square.row + i;
				var col = this.square.col + j;
				if ( row >= 0 && row <= 7 && col >= 0 && col <= 7 ) {
					var square = board[ row ][ col ];
					if ( square.piece == null || square.piece.color != this.color ) {
						squares.push( square );
					}
				}
			}
		}

		return squares;
	}
}