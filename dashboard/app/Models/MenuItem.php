<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MenuItem extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'menu_category_id',
        'name',
        'description',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function menuCategory()
    {
        return $this->belongsTo(MenuCategory::class);
    }
}
