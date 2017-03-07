var ROWS = [ '8', '7', '6', '5', '4', '3', '2', '1' ];
var COLS = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];
var COLORS = [ 'w', 'b' ];
var PIECES = [
	[ 'rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb' ],
	[ 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb' ],
	[ '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'  ],
	[ '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'  ],
	[ '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'  ],
	[ '0',  '0',  '0',  '0',  '0',  '0',  '0',  '0'  ],
	[ 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw' ],
	[ 'rw', 'nw', 'bw', 'qw', 'kw', 'bw', 'nw', 'rw' ]
];

var turn = 0;
var selected = null;

[ 'Piece', 'Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King' ].forEach( function( name ) {
	includeJS( 'js/Pieces/' + name + '.js' );
});

$( document ).ready( function() {
	$( '.board-wrapper' ).each( function( idx, board ) {

		var boardObj = createBoard();
		var boardDom = assembleBoardDom(boardObj);
		$( boardDom ).on( 'click', '.square', clickSquare );

		board.appendChild( boardDom );
	});
});


function createBoard() {
	var board = [];
	for ( var i = 0; i < 8; i++ ) {
		var row = [];
		for ( var j = 0; j < 8; j++ ) {

			var square = new Square( i, j );
			addPiece( PIECES[i][j], square );
			row.push( square );

		}
		board.push(row);
	}
	return board;
}

function addPiece( piece, square ) {
	var newPiece = null;

	if ( piece.charAt(0) == 'p' ) {
		newPiece = new Pawn( piece.charAt(1), square );
	} else if ( piece.charAt(0) == 'r' ) {
		newPiece = new Rook( piece.charAt(1), square );
	} else if ( piece.charAt(0) == 'n' ) {
		newPiece = new Knight( piece.charAt(1), square );
	} else if ( piece.charAt(0) == 'b' ) {
		newPiece = new Bishop( piece.charAt(1), square );
	} else if ( piece.charAt(0) == 'q' ) {
		newPiece = new Queen( piece.charAt(1), square );
	} else if ( piece.charAt(0) == 'k' ) {
		newPiece = new King( piece.charAt(1), square );
	}

	square.updatePiece( newPiece );
}

function assembleBoardDom( board ) {
	var boardDom = document.createElement( 'div' );
	boardDom.classList.add( 'board' );

	for ( var i in board ) {
		var rowDom = document.createElement( 'div' );
		rowDom.classList.add( 
			'row',
			'row-' + i
		);

		for ( var j in board[i] ) {
			rowDom.appendChild( board[i][j].dom );
		}

		boardDom.append( rowDom );
	}

	$( boardDom ).data( 'board', board );
	return boardDom;
}

// Square Prototype
function Square( row, col ) {
	this.row = row;
	this.col = col;
	this.row_name = ROWS[row];
	this.col_name = COLS[col];
	this.piece = null;
	this.dom = document.createElement( 'div' );
	$( this.dom ).addClass( 
		'square ' +
		'square-color-' + ( (row + col) % 2 )
	).data({
		square : this
	});

	this.updatePiece = function( piece ) {
		this.removePiece();

		if ( piece ) {
			piece.square = this;
			this.piece = piece;
			$( this.dom ).append( piece.dom );
		}
	}

	this.removePiece = function() {
		if ( this.piece ) {
			$( this.piece.dom ).remove();
			this.piece = null;
		}
	}
}


function clickSquare( event ) {
	var square = $( this ).data( 'square' );
	var board = $( event.delegateTarget ).data( 'board' );

	if ( selected == null ) {	

		if ( square.piece != null && square.piece.color == COLORS[turn] ) {
			selected = square.piece;
			var allowed = selected.getAllowedMoves( board );
			for ( var i in allowed ) {
				allowed[i].dom.classList.add( 'allowed' );
			}
		}
	} else {
		if ( selected.square != square ) {
			if ( selected.move( board, square ) ) {
				turnShift();
			}
		}

		$( '.square' ).removeClass( 'allowed' );
		selected = null;
	}
}

function turnShift() {
	turn = turn ? 0 : 1;
}

function includeJS( path ) {
	var script = $( '<script></script>').attr( {
		src : path,
		type : 'text/javascript'
	});
	$( 'head' ).append( script );
	script.remove();
}