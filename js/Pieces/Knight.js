// Knight SubClass
function Knight( color, square ) {
	this.name = 'Knight';
	Piece.call( this, color, square );

	this.getAllowedMoves = function( board ) {
		var squares = [];

		for ( var i = -2; i <= 2; i++ ) {
			for ( var j = -2; j <= 2; j++ ) {
				if ( Math.abs( i ) + Math.abs( j ) == 3 ) {
					var row = this.square.row + i;
					var col = this.square.col + j;
					if ( row >= 0 && row <= 7 && col >= 0 && col <= 7 ) {
						var square = board[row][col];
						if ( square.piece == null || square.piece.color != this.color ) {
							squares.push( square );
						}
					}
				}
			}
		}

		return squares;
	}
}