@extends('template.template')

@section('content')
    <div class="">
        <div class="header row gy-5  ">
            <div class="col ">
                <div class="card border-0   flex-shrink-0 p-3 card-home bg-prim ">
                    <h3 class="text-white text-capitalize text-center fw-bold "> Komik</h3>
                    <div class="d-flex gap-3 text-white">
                        <div class="col d-flex flex-column ">
                            <h6>Manga</h6>
                            <p>20</p>
                        </div>
                        <div class="col d-flex flex-column">
                            <h6>Manhwa</h6>
                            <p>20</p>
                        </div>
                        <div class="col d-flex flex-column">
                            <h6>Manhua</h6>
                            <p>20</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card border-0  flex-shrink-0  p-3  card-home">Kategori</div>
            </div>
            <div class="col-lg-3">
                <div class="card border-0  flex-shrink-0  p-3  card-home"></div>
            </div>
            <div class="col-lg-3">
                <div class="card border-0  flex-shrink-0  p-3  card-home"></div>
            </div>
        </div>
    </div>
@endsection
