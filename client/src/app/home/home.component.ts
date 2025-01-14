import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  currentIndex: number = 0;

  ngAfterViewInit() {
    this.updateSlidePosition();
    setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 giây chuyển slide
  }

  nextSlide() {
    const slides = this.carousel.nativeElement.children;
    if (this.currentIndex < slides.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first slide
    }
    this.updateSlidePosition();
  }

  prevSlide() {
    const slides = this.carousel.nativeElement.children;
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = slides.length - 1; // Loop back to the last slide
    }
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const carousel = this.carousel.nativeElement;
    const offset = -this.currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }
}
