import PIL as pl


def load_img(obj, target_size):

    img = pl.Image.open(obj)
    img = img.convert('RGB')
    width_height_tuple = (target_size[1], target_size[0])    
    print(img.mode)
    if img.size != width_height_tuple:
        width, height = img.size
        target_width, target_height = width_height_tuple
        crop_height = (width * target_height) // target_width
        crop_width = (height * target_width) // target_height
        crop_height = min(height, crop_height)
        crop_width = min(width, crop_width)
        crop_box_hstart = (height - crop_height) // 2
        crop_box_wstart = (width - crop_width) // 2
        crop_box_wend = crop_box_wstart + crop_width
        crop_box_hend = crop_box_hstart + crop_height
        crop_box = [crop_box_wstart, crop_box_hstart,
                    crop_box_wend, crop_box_hend]
        img = img.resize(width_height_tuple, box=crop_box)
    return img
